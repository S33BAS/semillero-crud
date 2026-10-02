CREATE TABLE tbl_colectivos (
	fld_id INTEGER PRIMARY KEY,
	fld_nombre VARCHAR(50) NOT NULL
);

CREATE TABLE tbl_personas (
	fld_id SERIAL PRIMARY KEY,
	fld_nombre VARCHAR(50) NOT NULL,
	fld_apellido VARCHAR(50) NOT NULL,
	fld_fechanac DATE NOT NULL,
	fld_colectivoid INTEGER NOT NULL REFERENCES tbl_colectivos(fld_id),
	created_at TIMESTAMPTZ DEFAULT now(),
	updated_at TIMESTAMPTZ DEFAULT now()
);	