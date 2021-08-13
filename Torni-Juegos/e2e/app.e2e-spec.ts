import { TorniJuegosPage } from './app.po';

describe('torni-juegos App', function() {
  let page: TorniJuegosPage;

  beforeEach(() => {
    page = new TorniJuegosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    //expect(page.getParagraphText()).toEqual('app works!');
  });
});
