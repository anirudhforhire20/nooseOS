class terminal extends frame {
    constructor()
    {
        super('Termial');

        const I = this;

        var shell = document.createElement('div');
        shell.classList.add('terminal');
        shell.setAttribute('tabindex', '0');
        I.appendtoBody(shell);

        var buf = document.createElement('p');
        buf.classList.add('buffer');
        shell.append(buf);

        var user = document.createElement('span');
        user.classList.add('text-green');
        //add user
        buf.append(user);

        buf.insertAdjacentHTML('beforeend', ' : ');

        var dir = document.createElement('span');
        dir.classList.add('text-blue');
        //add dir
        buf.append(dir);

        buf.insertAdjacentHTML('beforeend', ' $ ');

        var cmd = document.createElement('span');
        cmd.classList.add('text');
        buf.append(cmd);

        var bl = document.createElement('span');
        bl.classList.add('blinker');
        bl.innerHTML = '|';
        buf.append(bl);

        //adding keyboard events
        shell.onkeydown = function(event) {
            var key = event.key;
            if(key == 'Backspace')
            {
                cmd.innerHTML = cmd.innerHTML.substring(0 ,cmd.innerHTML.length - 1);
            }
            else if(!(key in ['CapsLock', 'Shift', 'Tab', 'Control', 'Alt']))
            {
                cmd.innerHTML += key;
            }
            else if(key == 'Enter')
            {
                //execute command
            }
        }
    }
}