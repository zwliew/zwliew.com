window.addEventListener('load', () => {
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
    let details;
    if (route in routes) {
      details = routes[route];
    } else {
      console.warn(`Route '${route}' does not exist; redirecting to home.`);
      details = routes.home;
    }

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

  // Start at home or whatever valid URL is entered
  navigate(`${window.location.pathname.replace(/^\/|\/$/g, '')}`, true);

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

  function goBackInHistory() {
    history.back();
  }
  const pageHeaderBack = document.getElementsByClassName('page-header-back');
  for (let i = 0; i < pageHeaderBack.length; i++) {
    pageHeaderBack.item(i).addEventListener('click', goBackInHistory);
  }

  // Projects
  const projectItems = document.getElementById('projects').getElementsByClassName('list-item');
  for (let i = 0; i < projectItems.length; i++) {
    const projectItem = projectItems.item(i);
    projectItem.addEventListener('click', window.open.bind(undefined, projectItem.dataset.href));
  }
});
