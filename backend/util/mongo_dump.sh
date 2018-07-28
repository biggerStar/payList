 mongodump -h 127.0.0.1 -o .
date=`date +"%Y-%m-%d"`
tar zcvf $date.tar.gz admin
bce bos cp $date.tar.gz bos:/songfuxing/payList/mongo/
