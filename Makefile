all: data/world.topo.json

sources:
	mkdir -p sources

sources/ne_10m_admin_0_sovereignty.zip: sources/
	curl http://www.nacis.org/naturalearth/10m/cultural/ne_10m_admin_0_sovereignty.zip -o $@
	touch $@

sources/ne_10m_admin_0_sovereignty.shp: sources/ne_10m_admin_0_sovereignty.zip
	unzip -d sources sources/ne_10m_admin_0_sovereignty.zip
	touch $@

data/world.topo.json: sources/ne_10m_admin_0_sovereignty.shp data/
	topojson -o data/world.topo.json -p name=NAME,code=ISO_A3 --simplify-proportion 0.1 -- world=sources/ne_10m_admin_0_sovereignty.shp
