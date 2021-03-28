"use strict"

const { dest, src, task, series } = require('gulp');
const gulpClean = require('gulp-clean');
const argv = require('yargs').argv;
const tslint = require('gulp-tslint');
const ts = require('gulp-typescript');
const log = require('fancy-log');
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');

task('clean', () => {
    return src([
        'dist',
        'scenariotestresults',
        'unittests'
    ],
        { read: false, allowEmpty: true })
        .pipe(gulpClean({ force: true }));
});

task('lint', () => {
    return src(['src/**/*.ts', '!src/generated/**/*.*'])
        .pipe(tslint())
        .pipe(tslint.report({ 'emitError': true, 'reportLimit': 0, 'summarizeFailureOutput': true }));
});

task('compile', () => {
    return src(['src/**/*.ts', '!src/**/*.spec.ts'])
        .pipe(ts('tsconfig.json', { dirRoot: 'src' }))
        .pipe(dest('dist'));
})

task('unitTest', (cb) => {
    const options = { cwd: 'src' };
    const args = ['-r', 'ts-node/register', '**/*.spec.ts'];

    mochaCmd(cb, args, options)
})

task('build', series('clean', 'lint', 'unitTest', 'compile'));

task('serveApp', (cb) => {
    const options = { cwd: 'src' }
    const args = ['.'];

    electronCmd(cb, args, options)
})

function mochaCmd(cb, args, options = {}, codeHandler = null) {
    log('mocha', args.join(' '));
    const errors = [];
    const electronMochaPath = lookup('electron-mocha/bin/electron-mocha');
    args = [electronMochaPath, ...args];
    const cmd = childProcess.spawn(process.argv0, args, options);
    cmd.stdout.on('data', function (data) { log(data.toString().trim()); });
    cmd.stderr.on('data', function (data) {
        const message = data.toString().trim();
        if (message.toUpperCase().startsWith('ERROR')) {
            log.error(message);
            errors.push(message);
        } else {
            log(message);
        }
    });
    cmd.on('exit', function (code) {
        if (codeHandler) {
            const codeError = codeHandler(code);
            if (codeError) {
                errors.push(codeError);
            }
        }
        if (errors.length > 0) {
            cb(errors.join('\n'));
        } else { cb(); }
    });
}

function electronCmd(cb, args, options = {}, codeHandler = null) {
    const electron =
        process.env.ELECTRON_PATH ||
        resolve('electron') ||
        resolve('electron-prebuilt') ||
        resolve('electron', require('which').sync)

    if (!electron) {
        log('Can not find `electron` in $PATH and $ELECTRON_PATH is not set.')
        process.exit(1)
    }

    args = [
        path.join(__dirname, '/dist/main.js'),
        ...process.argv.slice(2)
    ]

    const errors = [];
    const cmd = childProcess.spawn(electron, args, options);
    cmd.stdout.on('data', function (data) { log(data.toString().trim()); });
    cmd.stderr.on('data', function (data) {
        const message = data.toString().trim();
        if (message.toUpperCase().startsWith('ERROR')) {
            log.error(message);
            errors.push(message);
        } else {
            log(message);
        }
    });
    cmd.on('exit', function (code) {
        if (codeHandler) {
            const codeError = codeHandler(code);
            if (codeError) {
                errors.push(codeError);
            }
        }
        if (errors.length > 0) {
            cb(errors.join('\n'));
        } else { cb(); }
    });
}

// Look up a specific package within node_modules
function lookup(pathToLookup) {
    const moduleLength = module.paths.length;
    for (let i = 0; i < moduleLength; i += 1) {
        const modulePath = path.join(module.paths[i], pathToLookup);
        if (fs.existsSync(modulePath)) {
            return modulePath;
        }
    }
    return '';
}

function resolve(module, resolver) {
    try {
        return (resolver || require)(module)
    } catch (_) {
        // ignore
    }
}