import { deployAction } from '../bin/deploy';
import * as dataProcessing from '../bin/dataProcessing';
import * as publishModule from '../bin/publish';
import { defaults } from '../bin/constants';

jest.mock('../bin/dataProcessing', () => ({
  inputValidation: jest.fn(),
  transformInputValue: jest.fn(),
  updateConfig: jest.fn(),
}));

jest.mock('../bin/publish', () => ({
  publish: jest.fn(),
}));

describe('deployAction', () => {
  it('calls publish with default parameters when there is no user input', () => {
    deployAction({});
    expect(publishModule.publish).toHaveBeenCalledWith(defaults);
  });

  it('processing and transformation of user data', () => {
    const userOptions = { user: 'JaneDoe janedoe@example.com' };
    (dataProcessing.inputValidation as jest.Mock).mockReturnValue(true);
    (dataProcessing.transformInputValue as jest.Mock).mockReturnValue({
      name: 'JaneDoe',
      email: 'janedoe@example.com',
    });

    deployAction(userOptions);

    expect(dataProcessing.inputValidation).toHaveBeenCalledWith(
      userOptions.user,
      1,
    );
    expect(dataProcessing.transformInputValue).toHaveBeenCalledWith(
      userOptions.user,
      1,
    );
    expect(publishModule.publish).toHaveBeenCalled();
  });

  it('does not call publish if user data is invalid', () => {
    const userOptions = { user: 'invaliddata' };
    (dataProcessing.inputValidation as jest.Mock).mockReturnValue(false);

    deployAction(userOptions);

    expect(dataProcessing.inputValidation).toHaveBeenCalledWith(
      userOptions.user,
      1,
    );
    expect(publishModule.publish).not.toHaveBeenCalled();
  });
  it('updates configuration settings based on user data', () => {
    const userOptions = { user: 'JaneDoe janedoe@example.com', dir: 'newdir' };
    (dataProcessing.inputValidation as jest.Mock).mockReturnValue(true);
    (dataProcessing.transformInputValue as jest.Mock).mockImplementation(
      (value) => value,
    );
    (dataProcessing.updateConfig as jest.Mock).mockImplementation(
      (value, _, options) => ({ ...options, value }),
    );

    deployAction(userOptions);

    expect(dataProcessing.inputValidation).toHaveBeenCalledWith(
      userOptions.user,
      1,
    );
    expect(dataProcessing.transformInputValue).toHaveBeenCalledWith(
      userOptions.user,
      1,
    );
    expect(dataProcessing.updateConfig).toHaveBeenCalledWith(
      userOptions.user,
      1,
      expect.anything(),
    );
    expect(publishModule.publish).toHaveBeenCalledWith(
      expect.objectContaining({ user: userOptions.user, dir: userOptions.dir }),
    );
  });

  it('handles exceptions at runtime', () => {
    const userOptions = { user: 'invaliddata' };
    (dataProcessing.inputValidation as jest.Mock).mockReturnValue(false);
    const consoleSpy = jest.spyOn(console, 'log');

    deployAction(userOptions);

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(String));
  });
});
