const expect = require('chai').expect;
const getEladoMW = require('../../../../middleware/elado/getEladoMW');

describe('getElado middleware', function () {

    it('Should set res.locals.elado with elado object form database', function (done) {
        const mw = getEladoMW({
            EladoModel:{
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '1'});
                    cb(null, 'mockelado');
                }
            }
        });
        const resMock= {
            locals: {}
        };
        mw({
            params:{
                eladoid: '1'
            }
        }, resMock,
            ()=>{
            expect(resMock.locals).to.be.eql({elado: 'mockelado'});
            done();
        });
    });
    it('Should call next with error when there is a database problem', function (done) {
        const mw = getEladoMW({
            EladoModel:{
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '1'});
                    cb('dberror', null);
                }
            }
        });
        const resMock= {
            locals: {}
        };
        mw(
            {
                params:{
                    eladoid: '1'
                }
            },
            resMock,
            (err)=>{
                expect(err).to.be.eql('dberror');
                done();
            }
        );
    });
    it('Should call next when no elado found in the database', function (done) {
        const mw = getEladoMW({
            EladoModel:{
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '1'});
                    cb(undefined, null);
                }
            }
        });
        const resMock= {
            locals: {}
        };
        mw({
                params:{
                    eladoid: '1'
                }
            }, resMock,
            ()=>{
                expect(resMock.locals).to.be.eql({});
                done();
            });
    });
});
