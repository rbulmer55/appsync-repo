import { render } from 'appsync-testing';
import { readFileSync } from 'fs';
import { join } from 'path';

const templateFilePath = join(__dirname, '../After.each.res.vtl');
const template: string = readFileSync(templateFilePath).toString();

let context;

beforeEach(() => {
    context = {
        result: 'result',
    };
});

describe('After each request is processed', () => {
    describe('response', () => {
        it('should render the vtl', () => {
            const expected = 'result';
            const { result } = render(template, context);
            expect(result).toEqual(expected);
        });
    });
});
