class Context
{
    constructor()
    {
        this.groups = [];
    }

    getGroups()
    {
        return this.groups.concat([Context.DEFAULT_GROUP]);
    }


    addGroup(group)
    {
        if (this.groups.indexOf(group) === -1)
        {
            this.groups.push(group);
        }

        return this;
    }

    removeGroup(group)
    {
        const index = this.groups.indexOf(group);
        if (index !== -1)
        {
            this.groups.splice(index, 1);
        }

        return this;
    }

    hasGroup(group)
    {
        return (this.groups.indexOf(group) !== -1);
    }
}

Context.DEFAULT_GROUP = 'default';

module.exports = Context;
