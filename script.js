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
  function navigate(route) {
    if (!(route in routes)) {
      console.warn(`Route '${route}' does not exist.`);
      return;
    }

    const details = routes[route];
    history.pushState(route, details.title, details.path);
    document.title = `Zhao Wei - ${details.title}`;
    for (let el of sections) {
      if (el.id !== route) {
        el.style.display = 'none';
      } else {
        el.style.display = routes[route].display;
      }
    }
  }
  window.onpopstate = ({state}) => {
    for (let el of sections) {
      if (el.id !== state) {
        el.style.display = 'none';
      } else {
        el.style.display = routes[state].display;
      }
    }
  };

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

  // Blog
  const empty = true;
  if (empty) {
    const blogEmpty = document.getElementById('blog-empty');
    blogEmpty.style.display = 'block';
  }
};
