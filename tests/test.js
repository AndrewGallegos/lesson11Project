let page
module.exports = {
    before: browser => page = browser.page.wantedQueriesPage(),
    beforeEach: () => page.navigate(),
    after: () => page.end(),

    'Enter Wanted - Test Boundaries': () => {
        let checkError = (pageObject, parameters) => {
            pageObject
                .clearValue(parameters.selector)
                .setValue(parameters.selector, parameters.info)
                .click('@submit')
                .useXpath()
                .expect.element('//li[' + parameters.errorNumber + ']').text.to.equal(parameters.error)
            pageObject.useCss()
        }
        let parameters = [
            {selector: '@header', info: 'aaaaaaaa', error: 'The "Header" field should be between 9 and 19 characters long.', errorNumber: 1}, //header field 8 char
            {selector: '@header', info: 'aaaaaaaaaaaaaaaaaaaa', error: 'The "Header" field should be between 9 and 19 characters long.', errorNumber: 1}, //header field 20 char
            {selector: '@mke', info: 'a', error: 'The "MKE" field should be between 2 and 4 characters long.', errorNumber: 2}, //mke field 1 char
            {selector: '@mke', info: 'aaaaa', error: 'The "MKE" field should be between 2 and 4 characters long.', errorNumber: 2}, //mke field 5 char
            {selector: '@ori', info: 'aaaaaaaa', error: 'The "Originating Agency Identifier" field should be 9 characters long.', errorNumber: 3}, //ori field 8 char
            {selector: '@ori', info: 'aaaaaaaaaa', error: 'The "Originating Agency Identifier" field should be 9 characters long.', errorNumber: 3}, //ori field 10 char
            {selector: '@name', info: 'aa', error: 'The "Name" field should be between 3 and 30 characters long.', errorNumber: 4}, //name field 2 char
            {selector: '@name', info: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', error: 'The "Name" field should be between 3 and 30 characters long.', errorNumber: 4}, //name field 31 char
            {selector: '@height', info: '11', error: 'The "Height" field should be 3 characters long.', errorNumber: 7}, //height field 2 char
            {selector: '@height', info: '1111', error: 'The "Height" field should be 3 characters long.', errorNumber: 7}, //height field 4 char
            {selector: '@weight', info: '1111', error: 'The "Weight" field should be between 1 and 3 characters long.', errorNumber: 8}, //weight field 4 char
            {selector: '@hair', info: 'aa', error: 'The "Hair" field should be between 3 and 10 characters long.', errorNumber: 9}, //hair field 2 char
            {selector: '@hair', info: 'aaaaaaaaaaa', error: 'The "Hair" field should be between 3 and 10 characters long.', errorNumber: 9}, //hair field 11 char
            {selector: '@offense', info: 'aaaa', error: 'The "Offense" field should be between 5 and 15 characters long.', errorNumber: 10}, //offense field 4 char
            {selector: '@offense', info: 'aaaaaaaaaaaaaaaa', error: 'The "Offense" field should be between 5 and 15 characters long.', errorNumber: 10}, //offense field 16 char
        ]
        for (var i=0; i < parameters.length; i++) {
            checkError(page, parameters[i])
            page.click('@clear')
        }
    }
}