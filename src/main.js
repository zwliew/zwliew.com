import query from './query.js';
import Router from './router.js';

{ // Global block scope
const q = query(document);
const router = new Router(window, document, history);

window.addEventListener('load', () => {
  // Initialize the router
  router.init(q);

  // Start at whatever valid URL is entered, otherwise at home.
  router.navigate(window.location.pathname.replace(/^\/|\/$/g, ''), true);

  // Home
  q('#home-social-github').on('click', () => window.open('https://github.com/zwliew'));
  q('#home-social-email').on('click', () => window.open('mailto:zhaoweiliew@gmail.com'));
  q('#home-social-medium').on('click', () => window.open('https://medium.com/@zwliew'));
  q('#home-nav-blog').on('click', () => router.navigate('blog'));
  q('#home-nav-projects').on('click', () => router.navigate('projects'));
  q('#home-nav-about').on('click', () => router.navigate('about'));

  // Page header
  q('.page-header-blog').on('click', () => router.navigate('blog', true));
  q('.page-header-projects').on('click', () => router.navigate('projects', true));
  q('.page-header-about').on('click', () => router.navigate('about', true));
  q('.page-header-back').on('click', () => history.back());

  // Projects
  q('#projects .list-item').get().forEach(item => (
    item.addEventListener('click', () => window.open(item.dataset.href))
  ));
});
} // Global block scope
