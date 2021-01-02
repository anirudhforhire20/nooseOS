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
    }
};