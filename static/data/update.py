#%% 
import pandas as pd
from datetime import datetime as dt
# %%
df = pd.read_excel('dados_covid.xlsx')
df.shape

# %%
df['dataNotificacao'] = pd.to_datetime(df['dataNotificacao'], utc=False,dayfirst=True).dt.date
df['dataInicioSintomas'] = pd.to_datetime(df['dataInicioSintomas'], utc=False,dayfirst=True).dt.date

# %%
def conta(df,mun='RJ',onlyObito=False):
    if mun != 'RJ':
        df = df[df['municipio'] == mun]
    if onlyObito:
        df = df[df['evolucaoCaso'] == 'OBITO']
    df = pd.DataFrame(df.groupby('dataInicioSintomas')['classificacaoFinal'].count())
    df.rename(columns={'classificacaoFinal':'diario'}, inplace=True)
    df['acumulado'] = df['diario'].cumsum()
    df['7_dias'] = df['diario'].rolling(7).mean()
    df['14_dias'] = df['diario'].rolling(14).mean()
    return df
# %%
for mun in ['RJ','RIO DE JANEIRO','NITEROI','DUQUE DE CAXIAS']:
    for obito in [False,True]:
        filename = 'conta_'+mun.replace(' ','_')
        if obito:
            filename += '_obito'
        print(filename)
        df_x = conta(df,mun,obito).fillna(0)
        df_x[['7_dias','14_dias','diario']].plot()
        df_x = df_x.reset_index()
        df_x['dataInicioSintomas'] =  df_x['dataInicioSintomas'].apply(str)
        df_x.set_index('dataInicioSintomas', inplace=True)
        df_x.to_json(filename+'.json')


#%%

df.columns
# %%

df_reg = df[['sexo','idade','municipio','febre',
                'doencasRenais','fragilidadeImunologica',
                'diabetes','imunosupressao','doencasCardiacas',
                'gestanteAltoRisco','evolucaoCaso']]
df_reg['sexo'] = df_reg['sexo']=='M'
df_reg['evolucaoCaso'] = df_reg['evolucaoCaso']=='OBITO'
df_reg['capital'] = df_reg['municipio']=='RIO DE JANEIRO'
for j in ['febre','doencasRenais','fragilidadeImunologica',
                'diabetes','imunosupressao','doencasCardiacas',
                'gestanteAltoRisco']:
        df_reg[j] = df_reg[j]=='Sim'
# %%
aux = df_reg.groupby('municipio')['evolucaoCaso'].agg(['sum','count'])
aux['rate'] = aux['sum']/aux['count']

# %%
aux
# %%
df_reg2 = pd.merge(df_reg,aux,on='municipio')
# %%
df_reg2
# %%
from sklearn.svm import SVC




# %%
df_reg2.dropna(axis=1, inplace=True)
col_x = list(df_reg2.columns)
col_x.remove('municipio')
col_x.remove('evolucaoCaso')
col_y = 'evolucaoCaso'
# %%
X,y = df_reg2[col_x]*1, df_reg2[col_y]*1


#%%
clf = SVC(kernel='linear',class_weight='balanced', probability=True)
clf.fit(X[:-500], y[:-500])


#%%
y_new_clf = clf.predict(X[-500:])
sum(y_new_clf)
# %%
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X[:-500], y[:-500])

#%%
ynew = model.predict_proba(X[-500:])
# %%
ynew
# %%
from sklearn.ensemble import RandomForestClassifier

forest = RandomForestClassifier()
forest.fit(X[:-500], y[:-500])
y_new_forest = forest.predict(X[-500:])