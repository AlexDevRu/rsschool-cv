// VARIABLES & PATHS

let preprocessor = 'scss', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    baseDir      = 'app', // Base directory path without «/» at the end
    online       = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

	scripts: {
		src: [
			// 'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
			baseDir + '/js/main.js' // main.js. Always at the end
		],
		dest: baseDir + '/js',
	},

	styles: {
		src:  [
			'node_modules/normalize.css/normalize.css',
			baseDir + '/' + preprocessor + '/style.*'
		],
		dest: baseDir + '/css',
	},

	images: {
		src:  baseDir + '/img/src/**/*',
		dest: baseDir + '/img/dest',
	},

	cssOutputName: 'app.min.css',
	jsOutputName:  'app.min.js',

}

// LOGIC

const { src, dest, parallel, series, watch } = require('gulp');
const scss         = require('gulp-sass');
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const del          = require('del');
const fontmin      = require('gulp-fontmin');

function browsersync() {
	browserSync.init({
		server: { baseDir: baseDir + '/' },
		notify: false,
		online: online
	})
}

function scripts() {
	return src(paths.scripts.src)
	.pipe(concat(paths.jsOutputName))
	.pipe(uglify())
	.pipe(dest(paths.scripts.dest))
	.pipe(browserSync.stream())
}

function styles() {
	return src(paths.styles.src)
	.pipe(eval(preprocessor)())
	.pipe(concat(paths.cssOutputName))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } },/* format: 'beautify' */ }))
	.pipe(dest(paths.styles.dest))
	.pipe(browserSync.stream())
}

function images() {
	return src(paths.images.src)
	.pipe(newer(paths.images.dest))
	.pipe(imagemin())
	.pipe(dest(paths.images.dest))
}

function cleanimg() {
	return del('' + paths.images.dest + '/**/*', { force: true })
}

function fonts() {
    return src(baseDir + '/fonts/*.ttf')
    .pipe(fontmin())
    .pipe(dest(baseDir + '/fonts'));
}

function assembly() {
  let buildHtml = src('app/**/*.html')
    .pipe(dest('.'));

  let BuildCss = src('app/css/**/*.min.css')
    .pipe(dest('./css'));

  let BuildJs = src('app/js/**/*.min.js')
    .pipe(dest('./js'));
    
  let BuildFonts = src('app/fonts/**/*.*')
    .pipe(dest('./fonts'));

  let BuildImg = src('app/img/dest/**/*.*', {base: 'app/img/dest/'})
    .pipe(dest('./img/dest'));
}

function startwatch() {
	watch(baseDir  + '/' + preprocessor + '/**/*', {usePolling: true}, styles);
	//watch(baseDir  + '/img/src/**/*.{' + imageswatch + '}', {usePolling: true}, images);
	watch(baseDir  + '/**/*.{' + fileswatch + '}', {usePolling: true}).on('change', browserSync.reload);
	watch([baseDir + '/js/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], {usePolling: true}, scripts);
}

exports.browsersync = browsersync;
exports.assets      = series(cleanimg, styles, scripts, images);
exports.styles      = styles;
exports.scripts     = scripts;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.fonts       = fonts;
exports.assembly    = assembly;
exports.default     = parallel(images, styles, scripts, browsersync, startwatch);
