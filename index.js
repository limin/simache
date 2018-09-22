/**
 * @file
 * 
 * @copyright 2018 {@link https://limin.github.io Min Li}
 * 
 * @license Licensed under {@link https://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0}
 * 
 */

const byteof =require('byteof') 

const DEFAULT_TTL=3600*24*360 //one year
const DEFAULT_MAX=10 //10 megabytes

/**
 * 
 * A simple in-memory cache.
 * 
 */
class Simache{
   /**
    * 
    * @param {number} max - The max memory size in megabytes used by the cache
    */
   constructor(max=DEFAULT_MAX){
     //convert to bytes. 
    this.max=max*1024*1024
    this.size=0
    this.cache={} //key:{value,hits,expiredAt}
    this.keys=[]
   }
  
   /**
    * 
    * Get the value from cache of the key
    * 
    * @param {string} key - The key to be used to retrieve the cached value
    * @returns {*} The cached value or null if
    * <ul>
    * <li>The key doesn't exist</li>
    * <li>The cache has been expired</li>
    * </ul>
    */
   get(key){
    const value=this.cache[key]
    if(!value) return null    
    if(value.expiredAt<=Date.now()){
      this.remove(key)
      return null
    }else{
      value.hits++
      return {...value}    
    }
   }

   /**
    * 
    * Set the cached value 
    * 
    * @param {string} key - The key of the cached value
    * @param {*} value - The cached value
    * @param {number} ttl - The time to live of the cache in seconds
    */
   set(key,value,ttl=DEFAULT_TTL){
    const bytes=byteof(value)
    if(bytes>this.max){
      throw new Error("The object is too big to be cached.")
    }     
    key=new String(key)
    if(this.cache[key]){    
      this.remove(key)
    }

    while(this.size+bytes>this.max){
      this.remove(this.keys[0])
    }
    const v={
      value,
      hits:0,
      expiredAt: Date.now()+ttl*1000
    }    
    this.keys.push(key)    
    this.cache[key]=v
    this.size+=byteof(value)
   }

   /**
    * 
    * Remove the cached value with key from cache
    * 
    * @param {string} key 
    */
   remove(key){
    const o=this.cache[key]
    if(o){
      this.size-=byteof(this.cache[key].value)
      const index=this.keys.indexOf(key)
      this.keys.splice(index,1)    
      delete this.cache[key]  
    }
   }
}

module.exports=Simache