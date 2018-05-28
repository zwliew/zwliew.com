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
  function navigate(route, replaceState) {
    if (!(route in routes)) {
      console.warn(`Route '${route}' does not exist.`);
      return;
    }

    const details = routes[route];
    document.title = `Zhao Wei - ${details.title}`;
    makeRouteVisible(route);
    if (replaceState) {
      history.replaceState(route, details.title, details.path);
    } else {
      history.pushState(route, details.title, details.path);
    }
  }
  window.onpopstate = ({state}) => {
    if (state === undefined) {
      console.warn(`State ${state} is invalid.`);
      return;
    }
    document.title = `Zhao Wei - ${routes[state].title}`;
    makeRouteVisible(state);
  };

  // Start at home
  navigate('home', true);

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
  const pageHeaderBlog = document.getElementsByClassName('page-header-blog');
  const pageHeaderProjects = document.getElementsByClassName('page-header-projects');
  const pageHeaderAbout = document.getElementsByClassName('page-header-about');
  for (let i = 0; i < pageHeaderBlog.length; i++) {
    pageHeaderBlog.item(i).addEventListener('click', navigate.bind(undefined, 'blog', true));
    pageHeaderProjects.item(i).addEventListener('click', navigate.bind(undefined, 'projects', true));
    pageHeaderAbout.item(i).addEventListener('click', navigate.bind(undefined, 'about', true));
  }
};
