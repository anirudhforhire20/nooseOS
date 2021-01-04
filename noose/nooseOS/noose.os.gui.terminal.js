class terminal extends frame {
    constructor()
    {
        super('Termial');

        const I = this;

        var shell = document.createElement('div');
        shell.classList.add('terminal');
        shell.setAttribute('tabindex', '0');
        I.appendtoBody(shell);
        I.shell = shell;

        var buf = document.createElement('p');
        buf.classList.add('buffer');
        shell.append(buf);
        I.buf = buf;

        var user = document.createElement('span');
        user.classList.add('text-green');
        user.innerHTML = Interpreter.environment.user;
        buf.append(user);

        buf.insertAdjacentHTML('beforeend', ' : ');

        var dir = document.createElement('span');
        dir.classList.add('text-blue');
        dir.innerHTML = '~/';
        buf.append(dir);
        I.dir = dir;

        buf.insertAdjacentHTML('beforeend', ' $ ');

        var cmd = document.createElement('span');
        cmd.classList.add('text');
        buf.append(cmd);
        I.cmd = cmd;

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
            else if(key == 'Enter')
            {
                Interpreter.execute(cmd.innerHTML);
            }
            else if(!(key == 'Escape' || key == 'Tab' || key == 'CapsLock' || key == 'Shift' || key == 'Control' || key == 'Alt' || key == 'AltGraph' || key == '<' || key == '>' || key == '&'))
            {
                cmd.innerHTML += key;
            }
        }
        Interpreter.environment.terminal = I;
    }
    log(logstr)
    {
        const I = this;
        var logged = I.buf.cloneNode(true);
        logged.lastChild.remove();
        I.shell.append(logged);
        I.shell.insertAdjacentHTML('beforeend', '<p style="color : white;">' + logstr + '</p>');
        I.shell.append(I.buf);
        I.cmd.innerHTML = '';
    }
}