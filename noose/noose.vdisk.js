var disk = {
    metadata : {
        name : 'noose virtual disk',
        version : '1.1.0',
        maxAlc : 100,
        spcUsd : 0
    },
    reg : [],
    instructionSet : {
        read : function(dataObj) {
            for(var obj of disk.reg)
            {
                if(dataObj === obj)
                {
                    return obj;
                }
            }
            return false;
        },
        write : function(dataObj) {
            disk.reg.push(dataObj);
            return true;
        },
        del : function(dataObj) {
            if(dataObj in disk.reg)
            {
                var index = disk.reg.indexOf(dataObj);
                delete dataObj;
                disk.reg.splice(index, 1);
                return true;
            }
            else
            {
                return false;
            }
        }
    }
};