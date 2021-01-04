var Interpreter = {
    metadata : {
        name : 'noose static interpreter',
        version : '1.1.0'
    },
    environment : {
        terminal : null,
        user : null,
        dir : '~/'
    },
    commands : [
        {
            name : 'system.info',
            type : 'executable',
            params : false,
            flags : false,
            executable : function(params, flags) {
                //Interpreter.environment.terminal.log('');
                Interpreter.environment.terminal.log(Interpreter.metadata.name + '<br>' + 'v' + Interpreter.metadata.version);
                //Interpreter.environment.terminal.log('v' + Interpreter.metadata.version);
            }
        },
        {
            name : 'system.reboot',
            type : 'executable',
            params : false,
            flags : false,
            executable : function(params, flags) {
                setTimeout(function() {
                    window.location.reload();
                },200);
                Interpreter.environment.terminal.log('Rebooting machine');
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
                    executable : function(params, flags) {
                        var mt1 = diskManager.metadata;
                        //Interpreter.environment.terminal.log('');
                        Interpreter.environment.terminal.log(mt1.name + '<br>' + 'v' + mt1.version);
                        //Interpreter.environment.terminal.log('v' + mt1.version);
                    }
                },
                {
                    name : 'mkdir',
                    type : 'executable',
                    params : true,
                    flags : false,
                    executable : function(path, flags) {
                        var res = diskManager.mkdir(path);
                        Interpreter.environment.terminal.log(res);
                    }
                },
                {
                    name : 'cd',
                    type : 'executable',
                    params : true,
                    flags : false,
                    executable : function(path, flags) {
                        var res = diskManager.cd(path);
                        Interpreter.environment.terminal.log(res);
                        if(res != 'Cannot change directory. No such directory exists')
                        {
                            if(path[0] == '/')
                            {
                                Interpreter.environment.dir = path;
                                Interpreter.environment.terminal.dir.innerHTML = path;
                            }
                            else
                            {
                                Interpreter.environment.dir += path;
                                Interpreter.environment.terminal.dir.innerHTML += path;
                            }
                            //Interpreter.environment.terminal.dir.innerHTML = path;
                            //Interpreter.environment.terminal
                        }
                    }
                },
                {
                    name : 'rmdir',
                    type : 'executable',
                    params : true,
                    flags : true,
                    executable : function(path, flag=false) {
                        var res = diskManager.rmdir(path, flag);
                        Interpreter.environment.terminal.log(res);
                    }
                },
                {
                    name : 'ls',
                    type : 'executable',
                    params : false,
                    flags : false,
                    executable : function() {
                        for(var dirName of diskManager.metadata.environment.currentDir.children.metadata.directories)
                        {
                            Interpreter.environment.terminal.log(dirName);
                        }
                        for(var dirName of diskManager.metadata.environment.currentDir.children.metadata.files)
                        {
                            Interpreter.environment.terminal.log(dirName);
                        }
                    }
                }
            ]
        }
    ],
    execute : function(command) {
        var cmdArr = command.split(' ');
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
                        var flag = null;
                        var params = null;
                        if(cmd.flags == true)
                        {
                            if(cmdArr[index + 1])
                            {
                                if(cmdArr[index + 1].split('--')[1])
                                {
                                    flag = cmdArr[index + 1].split('--')[1];  
                                }
                            }
                        }
                        if(cmd.params == true)
                        {
                            if(cmdArr[index + 1])
                            {
                                params = cmdArr[index + 1];
                            }
                            else
                            {
                                Interpreter.environment.terminal.log('No params found');
                                return 0;
                            }
                        }
                        cmd.executable(params, flag);
                        return 0;
                    }
                }
            }
            Interpreter.environment.terminal.log('Command not found');
            return 0;
        }
        return recursive(0, Interpreter.commands);
    }
}