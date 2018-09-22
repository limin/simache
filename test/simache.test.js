const Simcache=require("../index")

describe('Test basic functions',()=>{
    test('Test get/set',()=>{
        const cache=new Simcache()
        cache.set('key1',1)
        expect(cache.get('key1').value).toEqual(1)
        expect(cache.get('key1').hits).toEqual(2)
        expect(cache.get('key1').hits).toEqual(3)
        expect(cache.get('key1').expiredAt).not.toBeNull()
    })

    test('Test set/get existing key',()=>{
        const cache=new Simcache()
        cache.set('key1',1)
        expect(cache.get('key1').value).toEqual(1)
        expect(cache.get('key1').hits).toEqual(2)
        expect(cache.get('key1').hits).toEqual(3)
        cache.set('key1',2)
        expect(cache.get('key1').value).toEqual(2)        
        expect(cache.get('key1').hits).toEqual(2)
    })

    test('Test ttl',()=>{
        const cache=new Simcache()
        const now=Date.now()        
        cache.set('key1',1,10)
        expect(cache.get('key1').value).toEqual(1)
        expect(cache.get('key1').hits).toEqual(2)
        expect(cache.get('key1').hits).toEqual(3)
        Date.now = jest.fn(()=>now+10*1000)
        expect(cache.get('key1')).toBeNull()
    })

    test('Test max memory usage',()=>{
        //set max memory usage 1 megabytes
        const cache=new Simcache(1)
        let str='' //1 kilobyte char array
        for(let i=0;i<512;i++){
            str=str.concat(' ')
        }
        for(let i=0;i<1024;i++){
            cache.set(i,str)
        }
        expect(cache.get('0').value).toEqual(str)
        expect(cache.get('1').value).toEqual(str)
        cache.set('a','a')
        expect(cache.get('0')).toBeNull()
        expect(cache.get('1').value).toEqual(str)
        expect(cache.get('a').value).toEqual('a')     
        cache.set('b',str)
        expect(cache.get('1')).toBeNull()                   
        expect(cache.get('2').value).toEqual(str)
        expect(cache.get('a').value).toEqual('a')     
        expect(cache.get('b').value).toEqual(str)             
    })
})