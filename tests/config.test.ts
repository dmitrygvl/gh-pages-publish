import * as readline from 'node:readline/promises';
import { config } from '../bin/config';
import * as dataProcessing from '../bin/dataProcessing';
import * as publishModule from '../bin/publish';

jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest
      .fn()
      .mockResolvedValueOnce('y') // Первый ответ пользователя
      .mockResolvedValueOnce('1') // Выбор пункта меню
      .mockResolvedValueOnce('новое значение') // Новое значение параметра
      .mockResolvedValueOnce('n'), // Завершение работы
    close: jest.fn(),
  }),
}));

jest.mock('../bin/publish', () => ({
  publish: jest.fn(),
}));

jest.mock('../bin/dataProcessing', () => ({
  inputValidation: jest.fn().mockReturnValue(true),
  transformInputValue: jest.fn().mockImplementation((value) => value),
  updateConfig: jest
    .fn()
    .mockImplementation((value, _, options) => ({ ...options, value })),
}));

describe('config', () => {
  it('processes user input and calls publish with the correct parameters', async () => {
    await config();

    expect(dataProcessing.inputValidation).toHaveBeenCalled();
    expect(dataProcessing.transformInputValue).toHaveBeenCalled();
    expect(dataProcessing.updateConfig).toHaveBeenCalled();
    expect(publishModule.publish).toHaveBeenCalledWith(expect.anything());
  });
  it('correctly handles invalid user input', async () => {
    (readline.createInterface as jest.Mock).mockReturnValueOnce({
      question: jest
        .fn()
        .mockResolvedValueOnce('y') // Пользователь решает настроить параметры
        .mockResolvedValueOnce('1') // Выбор пункта меню
        .mockResolvedValueOnce('invalid value') // Невалидный ввод
        .mockResolvedValueOnce('valid value') // Валидный ввод
        .mockResolvedValueOnce('n'), // Завершение настройки
      close: jest.fn(),
    });

    (dataProcessing.inputValidation as jest.Mock)
      .mockReturnValueOnce(false) // Первый ввод невалиден
      .mockReturnValueOnce(true); // Второй ввод валиден

    await config();

    expect(dataProcessing.inputValidation).toHaveBeenCalledTimes(2);
    expect(dataProcessing.updateConfig).toHaveBeenCalledTimes(1);
  });

  it('allows you to continue configuration after saving the parameter', async () => {
    (readline.createInterface as jest.Mock).mockReturnValueOnce({
      question: jest
        .fn()
        .mockResolvedValueOnce('y') // Пользователь решает настроить параметры
        .mockResolvedValueOnce('1') // Выбор пункта меню
        .mockResolvedValueOnce('валидное значение') // Валидный ввод
        .mockResolvedValueOnce('y') // Продолжить настройку
        .mockResolvedValueOnce('2') // Второй пункт меню
        .mockResolvedValueOnce('другое значение') // Валидный ввод
        .mockResolvedValueOnce('n'), // Завершение настройки
      close: jest.fn(),
    });

    (dataProcessing.inputValidation as jest.Mock).mockReturnValue(true);

    await config();

    expect(dataProcessing.updateConfig).toHaveBeenCalledTimes(2);
  });

  it('handles user refusal to configure parameters', async () => {
    (readline.createInterface as jest.Mock).mockReturnValueOnce({
      question: jest.fn().mockResolvedValueOnce('n'),
      close: jest.fn(),
    });

    await config();

    expect(dataProcessing.inputValidation).not.toHaveBeenCalled();
    expect(dataProcessing.updateConfig).not.toHaveBeenCalled();
    expect(publishModule.publish).toHaveBeenCalledWith(expect.anything());
  });
});
