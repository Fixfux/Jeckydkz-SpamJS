const LineAPI = require('./api');

let exec = require('child_process').exec;

class Command extends LineAPI {

    constructor() {
        super();
        this.spamName = [];
    }

    get payload() {
        if(typeof this.messages !== 'undefined'){
            return (this.messages.text !== null) ? this.messages.text.split(' ').splice(1) : '' ;
        }
        return false;
    }

    async searchGroup(gid) {
        let listPendingInvite = [];
        let thisgroup = await this._getGroup(gid);
        if(thisgroup.invitee !== null) {
            listPendingInvite = thisgroup.invitee.map((key) => {
                return { mid: key.mid };
            });
        }
        let listMember = thisgroup.members.map((key) => {
            return { mid: key.mid };
        });
        return { 
            listMember,
            listPendingInvite
        }
    }
    
    async cancelMember() {
        let ticketID = this.payload[0].replace("https://line.me/R/ti/g/","");
        let group = await this._findGroupByTicket(ticketID)
        let target = group.id;
        let { listPendingInvite } = await this.searchGroup(target);
        await this._acceptGroupInvitationByTicket(target,ticketID)
        //await this._sendMessage(this.messages, 'MADE IN EXPBOTS V1.2 LIMITID EDITION SPECIAL JS');
        if(listPendingInvite.length > 0){
            for (var i = 0; i < listPendingInvite.length; i++) {
                this._cancel(target,[listPendingInvite[i].mid]);
            }
        }
        return;
    }

    async getSpeed() {
        let curTime = Date.now() / 1000;
        await this._sendMessage(this.message, 'js');
        const rtime = (Date.now() / 1000) - curTime;
        await this._sendMessage(this.messages, `${rtime} 秒`);
        return;
    }

    spamGroup() {
        let target = this.payload[0]
        console.info(target)
        for (let i = 0; i < 100; i++) {
            this._createGroup('fuckyou',[target]);
        }
        return;
    }
    
    spamRoom() {
        let target = this.payload[0]
        console.info(target)
        for (let i = 0; i < 1; i++) {
            this._createRoom(target);
        }
        return;
    }
    async spamGroup1() {
        if(this.isAdminOrBot(this.messages._from) ) {
            const [ j, u ] = payload.split('-');
            const [ n, m ] = u.split('/');
            let add = await this._client.findAndAddContactsByMid(seq, `${m}`);
            for (var i = 0; i < j; i++) {
                await this._createGroup(`${n}`,[m]); 
             let gid = await this._findGroupByName(`${n}`); 
             for (var i = 0; i < gid.length; i++) { 
                 this._leaveGroup(gid[i]); 
             }
            }
        }
        return;
    }
    async kickTicket() {
        if(this.isAdminOrBot(this.messages._from) ) {
            let ticketID = this.payload[0].replace("https://line.me/R/ti/g/","");
            await console.info(ticketID)
            let group = await this._findGroupByTicket(ticketID)
            let target = group.id;
            let { listMember } = await this.searchGroup(target);
            let { listPendingInvite } = await this.searchGroup(target);
            let updateGroup = await this._getGroup(target);
            updateGroup.name = 'Jangan songong';
            updateGroup.preventedJoinByTicket = true;
            await this._acceptGroupInvitationByTicket(target,ticketID)
            //await this._sendMessage(this.messages, 'MADE IN EXPBOTS V1.2 LIMITID EDITION SPECIAL JS');
            this._updateGroup(updateGroup);
            if(listPendingInvite.length > 0){
                for (var i = 0; i < listPendingInvite.length; i++) {
                    this._cancel(target,[listPendingInvite[i].mid]);
                }
            }
            for (var i = 0; i < listMember.length; i++) {
                if(!this.isAdminOrBot(listMember[i].mid)){
                    this._kickMember(target,[listMember[i].mid])
                }
            }
            return;
        } 
        return this._sendMessage(this.messages, ' Kick Failed check status or admin only !');
    }
    async kickAll() {
        if(this.isAdminOrBot(this.messages._from) ) {
            let target = this.messages.to;
            let { listMember } = await this.searchGroup(target);
            let { listPendingInvite } = await this.searchGroup(target);
            let updateGroup = await this._getGroup(target);
            updateGroup.name = 'EXP TEAM BOT';
            updateGroup.preventedJoinByTicket = true;
            //await this._sendMessage(this.messages, 'Made in kicker now~•\n\n1. no baper\n2. no panik\n3. no sange\n4. no crot\n°°°The simple kickall bots•••');
            //await this._sendMessage(this.messages, '0.00147064533281 Second');
            this._updateGroup(updateGroup);
            if(listPendingInvite.length > 0){
                for (var i = 0; i < listPendingInvite.length; i++) {
                    this._cancel(target,[listPendingInvite[i].mid]);
                }
            }
            for (var i = 0; i < listMember.length; i++) {
                if(!this.isAdminOrBot(listMember[i].mid)){
                    this._kickMember(target,[listMember[i].mid])
                }
            }
            return;
        } 
        return this._sendMessage(this.messages, ' atas');
    }
}

module.exports = Command;
