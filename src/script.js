window.onload = () => {
  // Routing
  const sections = [
    document.getElementById('home'),
    document.getElementById('blog'),
    document.getElementById('projects'),
    document.getElementById('about'),
  ];
  const routes = {
    home: {
      title: 'Home',
      path: '/',
      display: 'flex',
    },
    blog: {
      title: 'Blog',
      path: '/blog',
      display: 'block',
    },
    projects: {
      title: 'Projects',
      path: '/projects',
      display: 'block',
    },
    about: {
      title: 'About',
      path: '/about',
      display: 'block',
    },
  };
  function makeRouteVisible(route) {
    for (let el of sections) {
      if (el.id !== route) {
        el.style.display = 'none';
      } else {
        el.style.display = routes[route].display;
      }
    }
  }
  function navigate(route) {
    if (!(route in routes)) {
      console.warn(`Route '${route}' does not exist.`);
      return;
    }

    const details = routes[route];
    history.pushState(route, details.title, details.path);
    document.title = `Zhao Wei - ${details.title}`;
    makeRouteVisible(route);
  }
  window.onpopstate = ({state}) => makeRouteVisible(state);

  navigate('home');

  // Home
  const homeSocialGithub = document.getElementById('home-social-github');
  const homeSocialEmail = document.getElementById('home-social-email');
  homeSocialGithub.addEventListener('click', () => {
    window.open('https://github.com/zwliew');
  });
  homeSocialEmail.addEventListener('click', () => {
    window.open('mailto:zhaoweiliew@gmail.com');
  });

  const homeNavBlog = document.getElementById('home-nav-blog');
  const homeNavProjects = document.getElementById('home-nav-projects');
  const homeNavAbout = document.getElementById('home-nav-about');
  homeNavBlog.addEventListener('click', () => navigate('blog'));
  homeNavProjects.addEventListener('click', () => navigate('projects'));
  homeNavAbout.addEventListener('click', () => navigate('about'));

  // Page header
  function goBackInHistory() {
    history.back();
  }
  const pageHeaderBacks = document.getElementsByClassName('page-header-back');
  for (let i = 0; i < pageHeaderBacks.length; i++) {
    pageHeaderBacks.item(i).addEventListener('click', goBackInHistory);
  }

  // Blog
  const empty = true;
  if (empty) {
    const blogEmpty = document.getElementById('blog-empty');
    blogEmpty.style.display = 'block';
  }
};
