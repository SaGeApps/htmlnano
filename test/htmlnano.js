import expect from 'expect';
import posthtml from 'posthtml';
import objectAssign from 'object-assign';
import htmlnano from '..';


describe('[htmlnano]', () => {
    it('should do nothing if all modules are disabled', () => {
        return init(
            ' <div> <!-- t --> </div> ',
            ' <div> <!-- t --> </div> '
        );
    });

    it('should throw an error if the module is not defined', () => {
        return init(
            '<div></div>',
            '<b></b>',
            {notDefinedModule: true}
        ).catch(error => {
            expect(error.message).toBe('Module "notDefinedModule" is not defined');
        });
    });
});


export function init(html, minifiedHtml, options) {
    let defaultOptions = {};
    // Disable all modules by default, so they can be tested isolated from each other
    Object.keys(htmlnano.defaultOptions).forEach(minifierName => {
        defaultOptions[minifierName] = false;
    });

    options = objectAssign({}, defaultOptions, options);
    return posthtml([htmlnano(options)]).process(html).then((result) => {
        expect(result.html).toBe(minifiedHtml);
    });
}
