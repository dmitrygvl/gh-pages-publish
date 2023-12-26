import ghpages from 'gh-pages';
import { publish } from '../bin/publish';

jest.mock('gh-pages');

describe('publish', () => {
  const mockPublish = ghpages.publish as jest.MockedFunction<
    typeof ghpages.publish
  >;

  beforeEach(() => {
    mockPublish.mockReset();
  });

  it('calls gh-pages.publish with the correct parameters', () => {
    const options = { dir: 'dist', message: 'Test publish' };
    publish(options);

    expect(mockPublish).toHaveBeenCalledWith(
      options.dir,
      options,
      expect.any(Function),
    );
  });
});
