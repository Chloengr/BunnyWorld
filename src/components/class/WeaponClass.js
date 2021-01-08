export default class WeaponClass {
    name = "";
    damage = 0;
    range = 0;
    sprite;
 
    constructor(_name, _damage, _range, _sprite) 
    {
      this.name = _name;
      this.damage = _damage;
      this.range = _range;
      this._sprite = this.sprite;
    }

    getName()
    {
      return this.name;
    }
    getDamage()
    {
      return this.damage;
    }
    getRange()
    {
      return this.range;
    }       
    getSprite()
    {
      return this.sprite;
    } 
}