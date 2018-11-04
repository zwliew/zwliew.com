import query from './query.js';
import Router from './router.js';

{ // Global block scope
const q = query(document);
const router = new Router(document, history, window);

window.addEventListener('load', () => {
  // Initialize the router
  router.init();

  // Start at whatever valid URL is entered, otherwise at home.
  router.navigate(window.location.pathname.replace(/^\/|\/$/g, ''), true);

  // Home
  q('#home-social-github').click(() => window.open('https://github.com/zwliew'));
  q('#home-social-email').click(() => window.open('mailto:zhaoweiliew@gmail.com'));
  q('#home-social-medium').click(() => window.open('https://medium.com/@zwliew'));
  q('#home-nav-blog').click(() => router.navigate('blog'));
  q('#home-nav-projects').click(() => router.navigate('projects'));
  q('#home-nav-about').click(() => router.navigate('about'));

  // Page header
  q('.page-header-blog').click(() => router.navigate('blog', true));
  q('.page-header-projects').click(() => router.navigate('projects', true));
  q('.page-header-about').click(() => router.navigate('about', true));
  q('.page-header-back').click(() => history.back());

  // Projects
  q('#projects .list-item').forEach(item => (
    item.click(() => window.open(item.dataset('href')))
  ));
});
} // Global block scope
