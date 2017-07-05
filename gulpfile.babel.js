'use strict';

import plugins  from 'gulp-load-plugins';
import yargs    from 'yargs';
import browser  from 'browser-sync';
import gulp     from 'gulp';
import panini   from 'panini';
import rimraf   from 'rimraf';
import sherpa   from 'style-sherpa';
import yaml     from 'js-yaml';
import fs       from 'fs';

// Load all Gulp plugins into one variable
const $ = plugins();
const p = require('./package.json');

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Build production by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel(pages, sass, javascript, images, copy, fonts), stamp, buildRevision, buildRevReplace));

// Build development
 gulp.task('build-dev',
 gulp.series(clean, gulp.parallel(pages, sass, javascript, images, copy, fonts)));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build-dev', server, watch));

// Version Bump
gulp.task('version', gulp.series(version));

// Stamp 
gulp.task('stamp', gulp.series(stamp));

// Cache
gulp.task('cache', gulp.series(buildRevision,buildRevReplace));

gulp.task('clean',clean);

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips  "images", "js", and "sass" folders, which are builded separately
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist));
}

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
function fonts(done) {
    if (PATHS.fonts && PATHS.fonts.length > 0){
    return gulp.src(PATHS.fonts)
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(PATHS.dist + '/fonts/'));
    }else {
      done();
    }

}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',      
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe($.if(PRODUCTION,$.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

function stamp(){
  return gulp.src([
    PATHS.dist + '/**/*.html'    
  ])    
    .pipe($.replace('Meao! -->', `v${p.version} - Meao! -->`))    
    .pipe(gulp.dest(PATHS.dist));
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
// function styleGuide(done) {
//   sherpa('src/styleguide/index.md', {
//     output: PATHS.dist + '/styleguide.html',
//     template: 'src/styleguide/template.html'
//   }, done);
// }

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src(PATHS.sassMain)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.cssimport({
      includePaths: 'src/assets/css/*.css'
    }))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/css'))
    .pipe(browser.reload({ stream: true }));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('main.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/scripts'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/images/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/images'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist 
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass, browser.reload));
  gulp.watch('src/assets/scripts/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/images/**/*').on('all', gulp.series(images, browser.reload));
  //gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, browser.reload));
}

// Basic usage: 
function version(){
  var options = {
    type : 'patch',
  };
  
  if (yargs.argv.minor){
    options.type = 'minor';
  } else if (yargs.argv.major){
    options.type = 'major';
  } else if (yargs.argv.version){
    options = {
      version: yargs.argv.version
    };
  }

  return gulp.src('./package.json')
  .pipe($.bump(options))
  .pipe(gulp.dest('./'));  
}

function buildRevision() {  
  return gulp.src([
      PATHS.dist + '/**/*.+(css|js)'
    ])
    .pipe($.rev())    
    .pipe($.print())
    .pipe($.revDeleteOriginal())
    .pipe(gulp.dest(PATHS.dist))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(PATHS.dist));
}

function buildRevReplace() {
  var manifest = gulp.src(PATHS.dist + '/rev-manifest.json');

  return gulp.src(PATHS.dist + '/**/*.html')
    .pipe($.print())
    .pipe($.revReplace({ manifest: manifest }))
    .pipe(gulp.dest(PATHS.dist));
}