const gulp = require('gulp'),
	babel = require('gulp-babel'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	eslint = require('gulp-eslint'),
	notify = require('gulp-notify'),
	prettier = require('gulp-prettier');

// Javascript
gulp.task('eslint', () => {
	// ESLint ignores files with "node_modules" paths.
	// So, it's best to have gulp ignore the directory as well.
	// Also, Be sure to return the stream from the task;
	// Otherwise, the task may end before the stream has finished.
	return (
		gulp
			.src(['./src/*.js'])
			// eslint() attaches the lint output to the "eslint" property
			// of the file object so it can be used by other modules.
			.pipe(eslint())
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(eslint.format())
			.pipe(
				notify({ message: 'TASK: "eslint" completed!', onLast: true })
			)
			// To have the process exit with an error code (1) on
			// lint error, return the stream and pipe to failAfterError last.
			.pipe(eslint.failAfterError())
	);
});

// Cleanup javascript formatting
gulp.task('prettier', () => {
	gulp
		.src('./src/*.js')
		.pipe(prettier({
			tabWidth: 2,
			printWidth: 80,
			singleQuote: true
		}))
		.pipe(gulp.dest('./src/'))
		.pipe(notify({ message: 'TASK: "prettier" completed', onLast: true }));
});

// Compile JS: Transpile with Babel, rename file, minify output, reload browser
gulp.task('js', () => {
	gulp
		.src('./src/*.js')
		.pipe(plumber())
		.pipe(babel())
		.pipe(
			rename({
				suffix: '.min'
			})
		)
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'))
		.pipe(notify({ message: 'TASK: "js" completed', onLast: true }));
});
