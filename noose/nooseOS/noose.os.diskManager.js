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
                return 'Created directory successfully';
            }
            if(currentDir.children.metadata.directories.includes(pathArr[index]))
            {
                if(index == pathArr.length - 2)
                {
                    if(currentDir.children.metadata.directories.includes(pathArr[index + 1]))
                    {
                        return 'Cannot create directory. It already exists';
                    }
                }
                var i = currentDir.children.metadata.directories.indexOf(pathArr[index]);
                var nextDir = currentDir.children.directories[i];
                recursive(index + 1, nextDir);
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
                recursive(index + 1, Dir);
            }
        }
        if(pathArr[0] == '')
        {
            recursive(1, diskManager.metadata.environment.currentDir);
        }
        else
        {
            recursive(0, diskManager.metadata.environment.currentDir);
        }
    }
};