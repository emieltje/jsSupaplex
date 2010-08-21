(function() {
    Ext.namespace('supaplex.level');

    var levelCache = null;
    const DATAFILE = 'levels.dat';

    /**
	 * Class for fetching, reading, parsing supaplex levels.
	 */
    supaplex.level = function(level) {
        /**
	     * Get the level data
	     */
        var getLevelData = function(url) {
            // Cache the level data!
            if (levelCache != null) {
                return levelCache;
            }

            var req = new XMLHttpRequest();
            req.open("GET", DATAFILE, false);
            req.overrideMimeType("text/plain; charset=x-user-defined");
            req.send("");
            if (req.status != 200) {
                return "";
            }
            var t = req.responseText || "";
            var ff = [];
            var mx = t.length;
            var scc = String.fromCharCode;
            for (var z = 0; z < mx; z++) {
                ff[z] = scc(t.charCodeAt(z) & 255);
            }

			var b = levelCache = ff.join("");
			
			return b;
        }
        /**
	     * Get bytes from starting from @var pointer
	     */
        var getBytes = function(data, bytes) {
            var ff = [];
            ff[0] = data;
            var d = ff.join("");
            var byteData = d.substring(_pointer, (_pointer + bytes));
            _pointer += bytes;

            return byteData;
        }
        /**
	     * Parses the level, and returns a array of tile type numbers
	     */
        var parseLevel = function(tiles) {
            var levelArray = [];
            var pos = 0;
            for (line = 0; line != 24; line++) {
                for (sprite = 0; sprite != 60; sprite++) {
                    var beginIndex = ((pos - 1) < 0) ? 0: pos;
                    levelArray.push(tiles.substring(beginIndex, pos + 1).charCodeAt(0));
                    pos++;
                }
            }

            return levelArray;
        }

        // Constructor
        var _pointer = 0;
        returnData = [];

        // Get the level binary
        var data = getLevelData(DATAFILE);
        // Slice-out one level
        var levelData = data.slice(((1536 * level) - 1536), (1536 * level));
        // Get all the tiles and parse it
        returnData.push({
            tiles: parseLevel(getBytes(levelData, 1440))
        });
        // Move pointer four bytes
        _pointer += 4;
        // Is gravitation enabled?
        var gravitation = getBytes(levelData, 1);
        // Move pointer 1 byte
        _pointer += 1;
        // Get the level title
        returnData.push({
            title: getBytes(levelData, 23),
			gravitation : gravitation
        });
        // Return the level data
        return returnData;
    }
})();