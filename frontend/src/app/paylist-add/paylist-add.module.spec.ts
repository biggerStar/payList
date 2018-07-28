import { PaylistAddModule } from './paylist-add.module';

describe('PaylistAddModule', () => {
  let paylistAddModule: PaylistAddModule;

  beforeEach(() => {
    paylistAddModule = new PaylistAddModule();
  });

  it('should create an instance', () => {
    expect(paylistAddModule).toBeTruthy();
  });
});
