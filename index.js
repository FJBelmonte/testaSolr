const axios = require("axios");
const path = require("path");
const _ = require("lodash");
const URL =
    "http://localhost:8983/solr/biocache/select?q=queryfl=id,data_resource_uid,data_resource,license,catalogue_number,taxon_concept_lsid,raw_taxon_name,raw_common_name,taxon_name,rank,common_name,kingdom,phylum,class,order,family,genus,species,institution_code,collection_code,raw_locality,raw_latitude,raw_longitude,raw_datum,latitude,longitude,coordinate_uncertainty,country,state,min_elevation_d,max_elevation_d,min_depth_d,max_depth_d,individual_count,year,month,basis_of_record,raw_basis_of_record,raw_sex,taxonomic_kosher,geospatial_kosher,collector,identified_by,identified_date,record_number,raw_sampling_protocol,event_id,institution_uid,collection_uid,data_resource_uid,data_provider_uid&q=species_group:%22Fishes%22&facet.mincount=1&facet.limit=-1&fq=geospatial_kosher:true&fq=-occurrence_status_s:absent&fq=-month:[*+TO+*]&facet.missing=true&rows=500&cursorMark=AoE/BTAwMWVlMjEyLTA3YmEtNDNjNC05OWVlLTk5MmNkOTAwYWZkMQ%3D%3D&sort=id+desc";

const test = async () => {
    let err = false;
    let count = 0;
    let oldRes;
    let newRes;

    do {
        try {
            const { status, data } = await axios.get(URL);
            if (_.isNil(oldRes)) {
                oldRes = data;
            }
            if (_.isNil(newRes)) {
                newRes = data;
            }
            if (status === 200) {
                if (_.isEqual(oldRes, newRes)) {
                    oldRes = newRes;
                    count = count + 1;
                    console.log(count);
                } else {
                    console.error("!=");
                }
            } else {
                console.warn(status);
            }
        } catch (err) {
            console.error(err.message);
        }
        await setTimeout(() => {}, 1000);
    } while (err === false);
};

test();
