set -m

/entrypoint.sh couchbase-server &

/opt/couchbase/wait-for-it.sh -t 180 --strict 127.0.0.1:8091 -- couchbase-cli cluster-init --cluster-username=gepuser --cluster-password=tang3456 --cluster-port=8091 --services=data,index,query,fts --cluster-ramsize=300 --cluster-index-ramsize=300 --cluster-fts-ramsize=300 --index-storage-setting=memopt

fg 1
