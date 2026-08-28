import { describe, expect, it } from 'vitest';
import robots from '../../app/robots';

describe('indexação da fixture', () => {
  it('permite crawl para que o meta noindex possa ser lido', () => {
    expect(robots()).toEqual({
      rules: {
        allow: '/',
        userAgent: '*',
      },
    });
  });
});
