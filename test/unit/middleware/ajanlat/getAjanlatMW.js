const expect = require('chai').expect;
const getAjanlatMW = require('../../../../middleware/ajanlat/getAjanlatMW');

describe('getAjanlat middleware', function () {

    it('Should set res.locals.ajanlat with ajanlat object form database', function (done) {
        const mw = getAjanlatMW({
            AjanlatModel:{
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '2'});
                    cb(null, 'mockajanlat');
                }
            }
        });
        const resMock= {
            locals: {}
        };
        mw({
            params:{
                ajanlatid: '2'
            }
        }, resMock,
            ()=>{
            expect(resMock.locals).to.be.eql({ajanlat: 'mockajanlat'});
            done();
        });
    });
    it('Should call next with error when there is a database problem', function (done) {
        const mw = getAjanlatMW({
            AjanlatModel:{
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '2'});
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
                    ajanlatid: '2'
                }
            },
            resMock,
            (err)=>{
                expect(err).to.be.eql('dberror');
                done();
            }
        );
    });
    it('Should call next when no ajanlat found in the database', function (done) {
        const mw = getAjanlatMW({
            AjanlatModel:{
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '2'});
                    cb(undefined, null);
                }
            }
        });
        const resMock= {
            locals: {}
        };
        mw({
                params:{
                    ajanlatid: '2'
                }
            }, resMock,
            ()=>{
                expect(resMock.locals).to.be.eql({});
                done();
            });
    });
});
