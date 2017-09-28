FROM couchbase:enterprise-4.6.0
COPY configure-node.sh /opt/couchbase
COPY wait-for-it.sh /opt/couchbase
CMD ["/opt/couchbase/configure-node.sh"]