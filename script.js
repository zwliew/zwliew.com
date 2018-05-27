window.onload = () => {
  // Home
  const homeSocialGithub = document.getElementById('home-social-github');
  const homeSocialEmail = document.getElementById('home-social-email');
  homeSocialGithub.addEventListener('click', () => {
    window.open('https://github.com/zwliew');
  });
  homeSocialEmail.addEventListener('click', () => {
    window.open('mailto:zhaoweiliew@gmail.com');
  })
};
