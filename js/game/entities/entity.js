define([], function () {

    class Entity {
        constructor(pos, {height, width}) {
            this.position = pos;
            this.height = height;
            this.width = width;
        }

        getBBox() {
            return {
                x: this.position.x,
                y: this.position.y,
                height: this.height,
                width: this.width
            }
        }

        isColliding(entity) {
            const entityBBox = entity.getBBox();
            const selfBBox = this.getBBox();
            return selfBBox.x < entityBBox.x + entityBBox.width &&
                selfBBox.x + selfBBox.width > entityBBox.x &&
                selfBBox.y < entityBBox.y + entityBBox.height &&
                selfBBox.height + selfBBox.y > entityBBox.y;
        }
    }
    return {
        Entity
    };
});