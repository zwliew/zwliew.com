import query from './query.js';
import Router from './router.js';

{ // Global block scope
const $ = query(document);
const router = new Router(window, document, history);

window.addEventListener('load', () => {
  // Initialize the router
  router.init($);

  // Start at whatever valid URL is entered, otherwise at home.
  router.navigate(`${window.location.pathname.replace(/^\/|\/$/g, '')}`, true);

  // Home
  $('#home-social-github').on('click', () => window.open('https://github.com/zwliew'));
  $('#home-social-email').on('click', () => window.open('mailto:zhaoweiliew@gmail.com'));
  $('#home-social-medium').on('click', () => window.open('https://medium.com/@zwliew'));
  $('#home-nav-blog').on('click', () => router.navigate('blog'));
  $('#home-nav-projects').on('click', () => router.navigate('projects'));
  $('#home-nav-about').on('click', () => router.navigate('about'));

  // Page header
  $('.page-header-blog').on('click', () => router.navigate('blog', true));
  $('.page-header-projects').on('click', () => router.navigate('projects', true));
  $('.page-header-about').on('click', () => router.navigate('about', true));
  $('.page-header-back').on('click', () => history.back());

  // Projects
  $('#projects .list-item').get().forEach(item => (
    item.addEventListener('click', () => window.open(item.dataset.href))
  ));
});
} // Global block scope
