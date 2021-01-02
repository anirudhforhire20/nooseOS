var diskManager = {
    metadata : {
        name : 'noose OS vdisk manager',
        version : '1.1.0',
        environment : {
            currentDir : disk.root
        }
    },
    mkdir : function(path) {
        //path will be a string
        var pathArr = path.split('/');
        function recursive(index, currentDir) 
        {
            if(index == pathArr.length)
            {
                //console.log('created');
                return 'Created directory successfully';
            }
            else if(currentDir.children.metadata.directories.includes(pathArr[index]))
            {
                var i = currentDir.children.metadata.directories.indexOf(pathArr[index]);
                var nextDir = currentDir.children.directories[i];
                //console.log('inside');
                if(index == pathArr.length - 2)
                {
                    //console.log('inside', index); 
                    if(nextDir.children.metadata.directories.includes(pathArr[index + 1]))
                    {
                        //console.log('failed');
                        return 'Cannot create directory. It already exists';
                    }
                }
                //var i = currentDir.children.metadata.directories.indexOf(pathArr[index]);
                //var nextDir = currentDir.children.directories[i];
                return recursive(index + 1, nextDir);
            }
            else
            {
                var Dir = {
                    id : currentDir.id + '.' + currentDir.index.toString(),
                    index : 100,
                    name : pathArr[index],
                    parent : currentDir,
                    children : {
                        metadata : {
                            files : [],
                            directories : []
                        },
                        files : [],
                        directories : []
                    }
                };
                currentDir.index += 1;
                currentDir.children.metadata.directories.push(Dir.name);
                currentDir.children.directories.push(Dir);
                return recursive(index + 1, Dir);
            }
        }
        if(pathArr[0] == '')
        {
            return recursive(1, diskManager.metadata.environment.currentDir);
        }
        else
        {
            return recursive(0, diskManager.metadata.environment.currentDir);
        }
    },
    rmdir : function(path, recursive=false)
            //path is string
            {
                var pathArr = path.split('/');
                var recf = null;
                if(recursive == false)
                {
                    function rec(index, currentDir) 
                    {
                        if(index == pathArr.length)
                        {
                            //console.log('created');
                            return 'Removed directory successfully';
                        }
                        else if(currentDir.children.metadata.directories.includes(pathArr[index]))
                        {
                            var i = currentDir.children.metadata.directories.indexOf(pathArr[index]);
                            var nextDir = currentDir.children.directories[i];
                            //console.log('inside');
                            if(index == pathArr.length - 1)
                            {
                                //console.log('inside', index); 
                                if(nextDir.children.metadata.directories.length > 0)
                                {
                                    //console.log('failed');
                                    return 'Cannot remove directory. It contains subdirectories';
                                }
                                else
                                {
                                    var parent = (currentDir.parent == null)? {children:{directories:[]}} : currentDir.parent;
                                    var meta = currentDir.name;
                                    var ind = 0;
                                    for(var i = 0; i < parent.children.directories.length; i++)
                                    {
                                        var dir = parent.children.directories[i];
                                        if(dir.name == meta)
                                        {
                                            ind = i;
                                            break;
                                        }
                                    }
                                    parent.children.metadata.directories.splice(ind, 1);
                                    parent.children.directories.splice(ind, 1);
                                    return rec(index + 1, nextDir);
                                }
                            }
                            //var i = currentDir.children.metadata.directories.indexOf(pathArr[index]);
                            //var nextDir = currentDir.children.directories[i];
                            return rec(index + 1, nextDir);
                        }
                        else
                        {
                            return 'Cannot remove directory. No such directory exists';
                        }
                    }
                    recf = rec;
                }
                else
                {
                    function rec(index, currentDir) 
                    {
                        if(index == pathArr.length)
                        {
                            //console.log('created');
                            return 'Removed directory successfully';
                        }
                        else if(currentDir.children.metadata.directories.includes(pathArr[index]))
                        {
                            var i = currentDir.children.metadata.directories.indexOf(pathArr[index]);
                            var nextDir = currentDir.children.directories[i];
                            //console.log('inside');
                            if(index == pathArr.length - 1)
                            {
                                currentDir.children = {
                                    metadata : {
                                        files : [],
                                        directories : []
                                    },
                                    files : [],
                                    directories : []
                                };
                            }
                            //var i = currentDir.children.metadata.directories.indexOf(pathArr[index]);
                            //var nextDir = currentDir.children.directories[i];
                            return rec(index + 1, nextDir);
                        }
                        else
                        {
                            return 'Cannot remove directory. No such directory exists';
                        }
                    }
                    recf = rec;
                }

                return (pathArr[0] == '')? recf(1, diskManager.metadata.environment.currentDir) : recf(0, diskManager.metadata.environment.currentDir);
            },

    cd : function(path) {
        //path will be a string
        var pathArr = path.split('/');
        function recursive(index, currentDir) 
        {
            if(index == pathArr.length)
            {
                //console.log('created');
                //console.log(index, pathArr.length);
                return true;
            }
            else if(currentDir.children.metadata.directories.includes(pathArr[index]))
            {
                var i = currentDir.children.metadata.directories.indexOf(pathArr[index]);
                var nextDir = currentDir.children.directories[i];
                //console.log(index, pathArr.length - 2);
                if(index == pathArr.length - 2)
                {
                    //console.log('inside', index); 
                    if(nextDir.children.metadata.directories.includes(pathArr[index + 1]))
                    {
                        var ind = nextDir.children.metadata.directories.indexOf(pathArr[index + 1]);
                        diskManager.metadata.environment.currentDir = nextDir.children.directories[ind];
                        //console.log(nextDir.children.directories[ind], ind);
                    }
                }
                //var i = currentDir.children.metadata.directories.indexOf(pathArr[index]);
                //var nextDir = currentDir.children.directories[i];
                return recursive(index + 1, nextDir);
            }
            else
            {
                return 'Cannot change directory. No such directory exists';
            }
        }
        return (pathArr[0] == '')? recursive(1, diskManager.metadata.environment.currentDir) : recursive(0, diskManager.metadata.environment.currentDir);
    }
};