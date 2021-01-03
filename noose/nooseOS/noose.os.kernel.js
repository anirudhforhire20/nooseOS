var Interpreter = {
    metadata : {
        name : 'noose static interpreter',
        version : '1.1.0'
    },
    environment : {
        terminal : null,
        user : null
    },
    commands : [
        {
            name : 'system.info',
            type : 'executable',
            params : false,
            flags : false,
            executable : function() {
                //figure out a way to display information
            }
        },
        {
            name : 'system.reboot',
            type : 'executable',
            params : false,
            flags : false,
            executable : function() {
                setTimeout(function() {
                    window.location.reload();
                },200);
                //log to the terminal
            }
        },
        {
            name : 'vdisk',
            type : 'category',
            children : [
                {
                    name : 'info',
                    type : 'executable',
                    params : false,
                    flags : false,
                    executable : function() {
                        var mt1 =diskManager.metadata;
                        //log 
                    }
                },
                {
                    name : 'mkdir',
                    type : 'executable',
                    params : true,
                    flags : false,
                    executable : function(path) {
                        diskManager.mkdir(path);
                        //log
                    }
                },
                {
                    name : 'cd',
                    type : 'executable',
                    params : true,
                    flags : false,
                    executable : function(path) {
                        diskManager.cd(path);
                        //log
                    }
                },
                {
                    name : 'rmdir',
                    type : 'executable',
                    params : true,
                    flags : true,
                    executable : function(path, flag) {
                        diskManager.rmdir(path, flag);
                        //log
                    }
                }
            ]
        }
    ],
    execute : function(command) {
        var cmdArr = command.split('/');
        function recursive(index, cmds)
        {
            for(var cmd of cmds)
            {
                if(cmd.name == cmdArr[index])
                {
                    if(cmd.type == 'category')
                    {
                        return recursive(index + 1, cmd.children);
                    }
                    else if(cmd.type == 'executable')
                    {
                        if(cmdArr[index + 1])
                        {
                            //inappropriate command
                        }
                        else
                        {
                            //execute command accordingly
                        }
                    }
                    else
                    {
                        //log for inappropriate command
                    }
                }
            }
            //log for inappropriate command
        }
        return recursive(0, Interpreter.commands);
    }
}