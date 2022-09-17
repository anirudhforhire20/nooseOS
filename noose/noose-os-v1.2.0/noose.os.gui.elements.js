var Home = {
    metadata : {
        div : null,
        name : 'noose operating system',
        version : '1.1.0'
    },
    environment : {
        icons : [],
        frames : [],
        header : {}
    },
    init : function() {
        document.getElementById('bootsheet').remove();
        var home = document.createElement('div');
        home.classList.add('home');
        document.body.innerHTML = '';
        document.body.insertAdjacentElement('afterbegin', home);
        Home.metadata.div = home;
        //creating header
        var header = document.createElement('div');
        header.classList.add('header');
        home.append(header);

        var activities = document.createElement('div');
        activities.style.color = 'white';
        activities.innerHTML = 'Activities';
        header.append(activities);
        
        var clock = document.createElement('div');
        clock.style.color = 'white';
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        setInterval(function() {
            var today = new Date();
            var hour = today.getHours();
            var minute = today.getMinutes();
            if(hour < 10)
            {
                hour = "0" + hour.toString();
            }
            else
            {
                hour = hour.toString();
            }
            if(minute < 10)
            {
                minute = "0" + minute.toString();
            }
            else
            {
                minute = minute.toString();
            }
            clock.innerHTML = months[today.getMonth()] + " " + today.getDate().toString() + " " + hour + ":" + minute
        }, 1000);

        header.append(clock);

        header.insertAdjacentHTML('beforeend', '<div></div>');
    }
};

class frame {
    position = {
        x : 0,
        y : 0,
    };
    offset = {
        x : 0,
        y : 0
    };
    prevPos = {
        x : 0,
        y : 0
    };
    state = {
        maximized : false,
        collapsed : false,
        head : {
            proximity : false,
            mouseDown : false
        },
        closed : false
    };
    parentIcon = null;
    constructor(title)
    {
        const I = this;

        var f = document.createElement('div');
        f.classList.add('frame');
        Home.metadata.div.append(f);
        //I.div = f;

        var fh = document.createElement('div');
        fh.classList.add('fhead');
        f.append(fh);

        var btngrp = document.createElement('div');
        btngrp.classList.add('btn-grp');
        fh.append(btngrp);

        var btcl = document.createElement('div');
        btcl.classList.add('btn', 'btn-close');
        btngrp.append(btcl);

        var btcol = document.createElement('div');
        btcol.classList.add('btn', 'btn-collapse');
        btngrp.append(btcol);
        I.btcol = btcol;

        var btmx = document.createElement('div');
        btmx.classList.add('btn', 'btn-maximize');
        btngrp.append(btmx);

        var t = document.createElement('div');
        t.classList.add('title');
        t.innerHTML = title;
        fh.append(t);

        var dv = document.createElement('div');
        dv.style.width = '70px';
        dv.style.height = '100%';
        fh.append(dv);

        var fb = document.createElement('div');
        fb.classList.add('fbody');
        f.append(fb);
        I.fb = fb;

        Home.environment.frames.push(I);

        //adding event listeners
        fh.onmouseenter = function() {
            I.state.head.proximity = true;
        };
        fh.onmouseleave = function() {
            I.state.head.proximity = false;
        }
        fh.onmousedown = function() {
            I.state.head.mouseDown = true;
        }
        fh.onmouseup = function() {
            I.state.head.mouseDown = false;
        }
        fh.onmousemove = function(event) {
            if(I.state.head.mouseDown == true)
            {
                f.style.transitionDuration = '0s';
                //console.log(I.position);
                f.style.left = ((-I.offset.x + event.clientX)).toString() + 'px';
                f.style.top = ((-I.offset.y + event.clientY)).toString() + 'px';
                I.position = {
                    x : -I.offset.x + event.clientX,
                    y : -I.offset.y + event.clientY
                };
            }
            else
            {
                f.style.transitionDuration = '200ms';
                I.offset.x = event.offsetX;
                I.offset.y = event.offsetY;
                //console.log(I.position.x, I.position.y);
            }
        }

        btcl.onclick = function() {
            setTimeout(function() {
                var index = Home.environment.frames.indexOf(I);
                delete Home.environment.frames[index];
                Home.environment.frames.splice(index, 1);
                I.state.closed = true;
                if(I.parentIcon !== null) I.parentIcon.frame = null;
                f.remove();
            }, 200);
            f.style.opacity = '0';
        }

        btmx.onclick = function(event) {
            if(I.state.maximized == true)
            {
                f.style.width = '700px';
                f.style.height = '400px';
                f.style.top = I.prevPos.y.toString() + 'px';
                f.style.left = I.prevPos.x.toString() + 'px';
                I.state.maximized = false;
            }
            else
            {
                I.prevPos = {
                    x : event.clientX,
                    y : event.clientY
                };
                f.style.width = '100%';
                f.style.height = '100%';
                f.style.top = '0px';
                f.style.left = '0px';
                I.state.maximized = true;
            }
        }

        btcol.onclick = function() {
            if(I.state.collapsed == true)
            {
                f.style.width = '700px';
                f.style.height = '400px';
                f.style.top = I.prevPos.y.toString() + 'px';
                f.style.left = I.prevPos.x.toString() + 'px';
                I.state.collapsed = false;
            }
            else
            {
                I.state.collapsed = true;
                f.style.width = '0px';
                f.style.height = '0px';
                f.style.top = '100%';
                f.style.left = '50%';
            }
        }
    }
    appendtoBody(div)
    {
        this.fb.append(div);
    }
}

class icon {
    state = {
        clicked : false
    }
    frame = null;
    constructor(title)
    {
        const I = this;

        var i = document.createElement('div');
        i.classList.add('icon');
        Home.metadata.div.append(i);
        I.div = i;

        var img = document.createElement('div');
        img.classList.add('img');
        i.append(img);

        var im = document.createElement('img');
        im.src = Icons[title];
        im.style.width = '100%';
        im.style.height = '100%';
        img.append(im);

        var t = document.createElement('div');
        t.classList.add('icon-title');
        t.innerHTML = title;
        i.append(t);

        Home.environment.icons.push(I);

        //adding event listeners
        i.ondblclick = function() {
            if(I.frame == null)
            {
                //console.log('creating frame')
                if(title == 'Terminal')
                {
                    I.frame = new terminal();
                    I.frame.parentIcon = I;
                }
                else if(title == 'system.log')
                {
                    I.frame = new sysLogger();
                    I.frame.parentIcon = I;
                }
                else if(title == 'Finder')
                {
                    I.frame = new finder();
                    I.frame.parentIcon = I;
                }
                else if(title == 'Simulator')
                {
                    I.frame = new simulator();
                    I.frame.parentIcon = I;
                }
            }
            else
            {
                I.frame.btcol.click();
            }
        }
    }
}