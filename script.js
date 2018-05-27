window.onload = () => {
  // Routes
  function navigate(route) {
    const routes = {
      blog: {
        title: 'Zhao Wei - Blog',
        path: '/blog',
      },
      projects: {
        title: 'Zhao Wei - Projects',
        path: '/projects',
      },
      about: {
        title: 'Zhao Wei - About',
        path: '/about',
      },
    };

    if (!(route in routes)) {
      console.warn(`Route '${route}' does not exist.`);
      return;
    }

    const details = routes[route];
    history.pushState(null, null, details.path);
    document.title = details.title;
  }

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
};
