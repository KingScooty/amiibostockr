#AmiiboStockr

##Deployment Journey

1. Development Environment
2. Deployed to Github
3. Built and tested on CirlceCI
4. Master test pass, trigger build on Docker Hub
5. Once built, trigger deploy on Tutum to Digital Ocean.

##Current live link:
http://382c2958-kingscooty.node.tutum.io

##Development Journey

- Query Amazon
  - Return flattened batch response

- Update stock table in redis
- Store product response as meta for site.
- Cross check stock with product table 

##Tabgs
###UK Id's - tag1
- http://www.amazon.co.uk/dp/B00Q6A57J2
- http://www.amazon.co.uk/dp/B00O9QCJFK
- http://www.amazon.co.uk/dp/B00SSU692M
- http://www.amazon.co.uk/dp/B00O9QC5N6
- http://www.amazon.co.uk/dp/B00N8PBOFO
- http://www.amazon.co.uk/dp/B00N8PBS0A
- http://www.amazon.co.uk/dp/B00Q6A571A
- http://www.amazon.co.uk/dp/B00QGBNLUI
- http://www.amazon.co.uk/dp/B00N8PBZSA
- http://www.amazon.co.uk/dp/B00N8PBQDE
- http://www.amazon.co.uk/dp/B00O9QC5R2
- http://www.amazon.co.uk/dp/B00Q6A578I
- http://www.amazon.co.uk/dp/B00SSU6936
- http://www.amazon.co.uk/dp/B00O9QC5Y0
- http://www.amazon.co.uk/dp/B00N8PBGV6
- http://www.amazon.co.uk/dp/B00N8PC142
- http://www.amazon.co.uk/dp/B00QGBNLU8
- http://www.amazon.co.uk/dp/B00QGBNMW0
- http://www.amazon.co.uk/dp/B00SSU6940
- http://www.amazon.co.uk/dp/B00SSU69DG
- http://www.amazon.co.uk/dp/B00N8PBJQ8
- http://www.amazon.co.uk/dp/B00N8PBYK4
- http://www.amazon.co.uk/dp/B00O9QCHDO
- http://www.amazon.co.uk/dp/B00SSU693Q
- http://www.amazon.co.uk/dp/B00Q6A56C0
- http://www.amazon.co.uk/dp/B00N8PBTVS
- http://www.amazon.co.uk/dp/B00Q6A56DY
- http://www.amazon.co.uk/dp/B00QGBNLUS
- http://www.amazon.co.uk/dp/B00QGBNLTO
- http://www.amazon.co.uk/dp/B00Q6A57C4
- http://www.amazon.co.uk/dp/B00N8PBXFK
- http://www.amazon.co.uk/dp/B00SSU65QC
- http://www.amazon.co.uk/dp/B00N8PBVHU
- http://www.amazon.co.uk/dp/B00N8PBMK6
- http://www.amazon.co.uk/dp/B00O9QC5PY

###US Id's - tag2
- http://www.amazon.com/dp/B00PG6Z65M
- http://www.amazon.com/dp/B00O97ZVJ0
- http://www.amazon.com/dp/B00V86BJX2
- http://www.amazon.com/dp/B00O982JSU
- http://www.amazon.com/dp/B00N4ABP7A
- http://www.amazon.com/dp/B00N4ABODK
- http://www.amazon.com/dp/B00PG7M95G
- http://www.amazon.com/dp/B00PG6ZDPK
- http://www.amazon.com/dp/B00N4ABV10
- http://www.amazon.com/dp/B00N4ABVOM
- http://www.amazon.com/dp/B00O97ZVJA
- http://www.amazon.com/dp/B00V86BJV4
- http://www.amazon.com/dp/B00O97ZWVC
- http://www.amazon.com/dp/B00N4ABMG4
- http://www.amazon.com/dp/B00N4ABOXU
- http://www.amazon.com/dp/B00PG6ZCT2
- http://www.amazon.com/dp/B00V86BRK2
- http://www.amazon.com/dp/B00N4ABT1W
- http://www.amazon.com/dp/B00N4ABSLS
- http://www.amazon.com/dp/B00O97ZYP6
- http://www.amazon.com/dp/B00V86BRHU
- http://www.amazon.com/dp/B00N49EEO2
- http://www.amazon.com/dp/B00PG6ZAZ8
- http://www.amazon.com/dp/B00PG6ZBTS
- http://www.amazon.com/dp/B00PG6Z9VI
- http://www.amazon.com/dp/B00N4ABMUA
- http://www.amazon.com/dp/B00V86C4LS
- http://www.amazon.com/dp/B00N49EERY
- http://www.amazon.com/dp/B00N4ABT1C
- http://www.amazon.com/dp/B00O92ONBM
