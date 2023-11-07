from ninja import NinjaAPI
#from Wiki.api import router as vcp_router
from Veraleo.api import router as vcp_router

# Create your router's here.

api = NinjaAPI()

api.add_router("/vcp/", vcp_router)




