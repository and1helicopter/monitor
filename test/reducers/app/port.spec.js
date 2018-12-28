import port  from '../../../app/reducers/app/port';

describe('reducers', () => {
    describe('port', () => {
        it('should handle initial state', () => {
            expect(port(undefined, {})).toEqual({    
                port: "COM1",
                addr: 1,
                baudRate: 115200,
                dataBits: 8, 
                stopBits: 1,  
                parity: 'odd'    
            });
        });

        it('should handle somthing', () => {
            expect(port({"port":"COM2"}, {})).toEqual({"port":"COM2"});
        });
    });
});