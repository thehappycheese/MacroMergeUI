import sys
import pandas
import json



df:pandas.DataFrame = pandas.read_csv(sys.stdin)
cols = list(df.columns)
sys.stdout.write(json.dumps(cols))

