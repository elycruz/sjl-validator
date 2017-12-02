export const
    log = console.log.bind(console),
    peek = x => {
        log(x);
        return x;
    };
