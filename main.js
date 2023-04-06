import page from 'page';
import './js/routes';
// import './js/track';

page.base(location.pathname.replace('/templates/', ''));
page('*', init.ctx);
page('/templates/home', route.home);
page('/templates/store', route.store);
page('/templates/about', route.about);
page('*', render.content);

page();
